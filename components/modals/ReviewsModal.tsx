
import React, { useState, useCallback, useMemo } from 'react';
import { Course, Review, ReviewRatings } from '../../types';
import { summarizeReviews } from '../../services/geminiService';

const WORKLOAD_EXPECTATION_MAP: { [key: number]: string } = {
    1: 'Much Less than Expected',
    2: 'Less than Expected',
    3: 'As Expected',
    4: 'More than Expected',
    5: 'Much More than Expected',
};

const RatingInput: React.FC<{
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    helpText?: string;
    valueMap?: { [key: number]: string };
}> = ({ label, value, onChange, min = 1, max = 5, step = 1, helpText, valueMap }) => (
  <div>
    <label className="block mb-1 text-brand-accent flex justify-between items-end">
      <span>{label}</span>
      <span className="font-bold text-brand-text text-sm">{valueMap ? valueMap[value] : `${value}/${max}`}</span>
    </label>
    {helpText && <p className="text-xs text-gray-500 -mt-1 mb-2">{helpText}</p>}
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} className="w-full h-2 bg-brand-secondary rounded-lg appearance-none cursor-pointer accent-brand-primary" />
  </div>
);

interface AddReviewFormProps {
  courseId: string;
  onAddReview: (courseId: string, review: { ratings: ReviewRatings; comment: string; author: string; date: string }) => void;
  onCancel: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ courseId, onAddReview, onCancel }) => {
    const [step, setStep] = useState(1);
    const [verificationFile, setVerificationFile] = useState<File | null>(null);
    const [ratings, setRatings] = useState<ReviewRatings>({
        difficulty: 3,
        workload: 8,
        clarity: 3,
        fairness: 3,
        usefulness: 3,
        engagement: 3,
        workloadExpectation: 3,
    });
    const [comment, setComment] = useState('');
    const [author, setAuthor] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [error, setError] = useState('');

    const handleRatingChange = (field: keyof ReviewRatings, value: number) => {
        setRatings(prev => ({...prev, [field]: value}));
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]){
            setVerificationFile(e.target.files[0]);
            setError('');
        }
    };

    const handleVerify = () => {
        if(!verificationFile) {
            setError('Please upload a file to verify enrollment.');
            return;
        }
        setError('');
        setStep(2);
    };

    const handleSubmit = () => {
        if((!author.trim() && !isAnonymous) || !comment.trim()){
            setError('Please fill out all fields.');
            return;
        }
        onAddReview(courseId, {
            ratings,
            comment,
            author: isAnonymous ? 'Anonymous' : author.trim(),
            date: new Date().toLocaleDateString('en-US')
        });
        onCancel();
    };

    return (
        <div className="bg-brand-bg p-6 rounded-lg my-4 border border-brand-secondary">
            <h4 className="text-xl font-bold text-brand-text mb-4">Add Your Review</h4>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {step === 1 && (
                <div>
                    <p className="mb-2 text-brand-accent">To ensure review quality, please verify you've taken this course.</p>
                    <p className="text-xs text-gray-500 mb-4">(This is a simulation. You can upload any file.)</p>
                    <input type="file" onChange={handleFileChange} className="mb-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-opacity-90"/>
                    <div className="flex justify-end space-x-2">
                        <button onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button onClick={handleVerify} className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-opacity-90">Verify & Continue</button>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <RatingInput label="Course Difficulty" value={ratings.difficulty} onChange={v => handleRatingChange('difficulty', v)} helpText="1=Easy, 5=Very Hard" />
                        <RatingInput label="Professor Clarity" value={ratings.clarity} onChange={v => handleRatingChange('clarity', v)} helpText="How clear were lectures?" />
                        <RatingInput label="Grading Fairness" value={ratings.fairness} onChange={v => handleRatingChange('fairness', v)} helpText="Were grades fair?" />
                        <RatingInput label="Usefulness of Materials" value={ratings.usefulness} onChange={v => handleRatingChange('usefulness', v)} helpText="Textbooks, notes, etc." />
                        <RatingInput label="Engagement / Participation" value={ratings.engagement} onChange={v => handleRatingChange('engagement', v)} helpText="How engaging was the class?" />
                        <RatingInput label="Expected vs. Actual Workload" value={ratings.workloadExpectation} onChange={v => handleRatingChange('workloadExpectation', v)} valueMap={WORKLOAD_EXPECTATION_MAP} />
                        <div className="md:col-span-2">
                             <label className="block mb-1 text-brand-accent">Workload (hours/week): <span className="font-bold text-brand-text">{ratings.workload}</span></label>
                            <input type="number" value={ratings.workload} onChange={e => handleRatingChange('workload', Number(e.target.value))} className="w-full bg-brand-surface p-2 rounded-md border border-brand-secondary"/>
                        </div>
                    </div>
                     <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Your detailed review..." rows={4} className="w-full bg-brand-surface p-2 rounded-md border border-brand-secondary"></textarea>
                    <div className="flex items-center gap-4">
                       <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Your Name (e.g., Jane D.)" className="flex-grow bg-brand-surface p-2 rounded-md border border-brand-secondary disabled:bg-gray-100" disabled={isAnonymous}/>
                        <label className="flex items-center space-x-2 text-sm text-brand-accent">
                          <input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} className="form-checkbox h-4 w-4 rounded bg-brand-surface border-brand-secondary text-brand-primary focus:ring-brand-primary"/>
                          <span>Post anonymously</span>
                        </label>
                    </div>
                    <div className="flex justify-end space-x-2">
                         <button onClick={() => setStep(1)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Back</button>
                        <button onClick={handleSubmit} className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-opacity-90">Submit Review</button>
                    </div>
                </div>
            )}
        </div>
    );
};


interface ReviewsModalProps {
  course: Course;
  onClose: () => void;
  onAddReview: (courseId: string, review: { ratings: ReviewRatings; comment: string; author: string; date: string }) => void;
  startWithAddReview?: boolean;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({ course, onClose, onAddReview, startWithAddReview=false }) => {
    const [showAddReview, setShowAddReview] = useState(startWithAddReview);
    const [aiSummary, setAiSummary] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);

    const handleGetSummary = async () => {
        setIsSummarizing(true);
        const summary = await summarizeReviews(course.reviews);
        setAiSummary(summary);
        setIsSummarizing(false);
    };
    
    const DetailItem: React.FC<{label: string; children: React.ReactNode}> = ({label, children}) => (
      <div>
        <p className="font-semibold text-brand-accent">{label}</p>
        <div className="text-brand-text pl-2">{children}</div>
      </div>
    );

    const averageRatings = useMemo(() => {
        if (course.reviews.length === 0) return null;
        const total = course.reviews.reduce((acc, review) => {
            acc.clarity += review.ratings.clarity;
            acc.fairness += review.ratings.fairness;
            acc.usefulness += review.ratings.usefulness;
            acc.engagement += review.ratings.engagement;
            return acc;
        }, { clarity: 0, fairness: 0, usefulness: 0, engagement: 0 });

        const count = course.reviews.length;
        const overall = (total.clarity + total.fairness + total.usefulness + total.engagement) / (count * 4);
        return {
            overall: overall.toFixed(1),
        };
    }, [course.reviews]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-brand-surface border border-brand-secondary rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-brand-secondary">
                    <div>
                        <h2 className="text-2xl font-bold text-brand-text">{course.id} (CRN: {course.crn}): {course.title}</h2>
                        {averageRatings && <p className="text-lg font-bold text-brand-primary">Overall Rating: {averageRatings.overall}/5.0</p>}
                    </div>
                    <button onClick={onClose} className="text-2xl font-bold hover:text-brand-primary">&times;</button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                    {/* Course Details */}
                    <div className="space-y-3">
                      <DetailItem label="Instructor">
                        <p>{course.instructor} {course.instructorContact && <a href={`mailto:${course.instructorContact}`} className="text-brand-primary hover:underline">({course.instructorContact})</a>}</p>
                      </DetailItem>
                      {course.prerequisites.length > 0 && <DetailItem label="Prerequisites"><p>{course.prerequisites.join(', ')}</p></DetailItem>}
                      {course.materials.length > 0 && 
                        <DetailItem label="Required Materials">
                          <ul className="list-disc list-inside">
                            {course.materials.map(m => <li key={m.name}>{m.link ? <a href={m.link} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">{m.name}</a> : m.name}</li>)}
                          </ul>
                        </DetailItem>
                      }
                    </div>

                    {/* Sections */}
                    {course.sections.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-brand-text mb-2 border-t border-brand-secondary pt-4">Sections</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {course.sections.map(sec => (
                            <div key={sec.id} className="bg-brand-secondary/50 p-3 rounded-md">
                              <p className="font-bold">{sec.type} (Section {sec.id})</p>
                              <p className="text-sm">{sec.time}</p>
                              <p className="text-sm">{sec.location}</p>
                              <p className="text-sm">Instructor: {sec.instructor}</p>
                              <p className="text-sm font-medium text-brand-text flex items-center">
                                  Enrollment: {sec.enrolled} / {sec.capacity}
                                  <span 
                                    className={`ml-2 inline-block h-3 w-3 rounded-full ${sec.enrolled >= sec.capacity ? 'bg-red-500' : (sec.enrolled / sec.capacity > 0.85 ? 'bg-yellow-400' : 'bg-green-500')}`}
                                    title={sec.enrolled >= sec.capacity ? 'Full' : (sec.enrolled / sec.capacity > 0.85 ? 'Nearly Full' : 'Open')}
                                  ></span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Reviews Section */}
                    <div className="border-t border-brand-secondary pt-4">
                      <h3 className="text-xl font-bold text-brand-text mb-4">Student Reviews</h3>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                          <button onClick={() => setShowAddReview(true)} disabled={showAddReview} className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed">
                              Add a Review
                          </button>
                           <button onClick={handleGetSummary} disabled={isSummarizing || course.reviews.length === 0} className="px-4 py-2 bg-lehigh-green text-white font-semibold rounded-md hover:bg-green-700 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
                               {isSummarizing ? (
                                  <>
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Summarizing...
                                  </>
                               ) : 'Get AI Summary'}
                           </button>
                      </div>

                      {showAddReview && <AddReviewForm courseId={course.id} onAddReview={onAddReview} onCancel={() => setShowAddReview(false)}/>}
                      
                      {aiSummary && (
                          <div className="bg-brand-secondary/50 p-4 rounded-lg my-4">
                              <h4 className="font-bold text-brand-text mb-2">AI Summary</h4>
                              <p className="text-sm text-brand-text italic">{aiSummary}</p>
                          </div>
                      )}
                      
                      <div className="space-y-4 mt-4">
                          {course.reviews.length > 0 ? course.reviews.map(review => (
                              <div key={review.id} className="bg-brand-secondary/50 p-4 rounded-lg">
                                  <div className="flex justify-between items-center mb-2">
                                      <p className="font-bold text-brand-text">{review.author}</p>
                                      <p className="text-sm text-brand-accent">{review.date}</p>
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mt-2 text-sm border-t border-brand-accent/20 pt-2">
                                    <div><strong>Difficulty:</strong> {review.ratings.difficulty}/5</div>
                                    <div><strong>Workload:</strong> {review.ratings.workload} hrs/wk</div>
                                    <div><strong>Prof Clarity:</strong> {review.ratings.clarity}/5</div>
                                    <div><strong>Fair Grading:</strong> {review.ratings.fairness}/5</div>
                                    <div><strong>Materials:</strong> {review.ratings.usefulness}/5</div>
                                    <div><strong>Engagement:</strong> {review.ratings.engagement}/5</div>
                                    <div className="col-span-2 md:col-span-3"><strong>Workload Fit:</strong> {WORKLOAD_EXPECTATION_MAP[review.ratings.workloadExpectation]}</div>
                                  </div>
                                  <p className="mt-2 text-brand-accent italic">"{review.comment}"</p>
                              </div>
                          )) : (
                              !showAddReview && <p className="text-center text-brand-accent">No reviews yet. Be the first to add one!</p>
                          )}
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewsModal;
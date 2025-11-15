
import React, { useState, useCallback } from 'react';
import { Course, Review } from '../../types';
import { summarizeReviews } from '../../services/geminiService';

interface AddReviewFormProps {
  courseId: string;
  onAddReview: (courseId: string, review: { rating: number; comment: string; author: string; date: string }) => void;
  onCancel: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ courseId, onAddReview, onCancel }) => {
    const [step, setStep] = useState(1);
    const [verificationFile, setVerificationFile] = useState<File | null>(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('');

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
        if(!author.trim() || !comment.trim()){
            setError('Please fill out all fields.');
            return;
        }
        onAddReview(courseId, {
            rating,
            comment,
            author,
            date: new Date().toLocaleDateString('en-US')
        });
        onCancel();
    };

    return (
        <div className="bg-lehigh-dark-brown p-6 rounded-lg mt-4">
            <h4 className="text-xl font-bold text-lehigh-gold mb-4">Add Your Review</h4>
            {error && <p className="text-red-400 mb-4">{error}</p>}
            {step === 1 && (
                <div>
                    <p className="mb-2 text-lehigh-light-gold">To ensure review quality, please verify you've taken this course.</p>
                    <p className="text-xs text-gray-400 mb-4">(This is a simulation. You can upload any file.)</p>
                    <input type="file" onChange={handleFileChange} className="mb-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-lehigh-gold file:text-lehigh-dark-brown hover:file:bg-yellow-500"/>
                    <div className="flex justify-end space-x-2">
                        <button onClick={onCancel} className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500">Cancel</button>
                        <button onClick={handleVerify} className="px-4 py-2 bg-lehigh-gold text-lehigh-dark-brown font-semibold rounded-md hover:bg-yellow-500">Verify & Continue</button>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="space-y-4">
                    <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Your Name (e.g., Jane D.)" className="w-full bg-gray-800 p-2 rounded-md border border-lehigh-light-gold"/>
                    <div>
                        <label className="block mb-2">Rating: <span className="font-bold text-lehigh-gold">{rating}/10</span></label>
                        <input type="range" min="1" max="10" value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full"/>
                    </div>
                    <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Your detailed review..." rows={4} className="w-full bg-gray-800 p-2 rounded-md border border-lehigh-light-gold"></textarea>
                    <div className="flex justify-end space-x-2">
                         <button onClick={() => setStep(1)} className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500">Back</button>
                        <button onClick={handleSubmit} className="px-4 py-2 bg-lehigh-gold text-lehigh-dark-brown font-semibold rounded-md hover:bg-yellow-500">Submit Review</button>
                    </div>
                </div>
            )}
        </div>
    );
};


interface ReviewsModalProps {
  course: Course;
  onClose: () => void;
  onAddReview: (courseId: string, review: { rating: number; comment: string; author: string; date: string }) => void;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({ course, onClose, onAddReview }) => {
    const [showAddReview, setShowAddReview] = useState(false);
    const [aiSummary, setAiSummary] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);

    const handleGetSummary = async () => {
        setIsSummarizing(true);
        const summary = await summarizeReviews(course.reviews);
        setAiSummary(summary);
        setIsSummarizing(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-lehigh-dark-brown border border-lehigh-light-gold rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-lehigh-brown">
                    <h2 className="text-2xl font-bold text-lehigh-gold">{course.id}: {course.title} Reviews</h2>
                    <button onClick={onClose} className="text-2xl font-bold hover:text-lehigh-gold">&times;</button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                        <button onClick={() => setShowAddReview(true)} disabled={showAddReview} className="px-4 py-2 bg-lehigh-gold text-lehigh-dark-brown font-semibold rounded-md hover:bg-yellow-500 disabled:bg-gray-500 disabled:cursor-not-allowed">
                            Add a Review
                        </button>
                         <button onClick={handleGetSummary} disabled={isSummarizing || course.reviews.length === 0} className="px-4 py-2 bg-lehigh-green text-white font-semibold rounded-md hover:bg-green-700 flex items-center justify-center gap-2 disabled:bg-gray-500 disabled:cursor-not-allowed">
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
                        <div className="bg-lehigh-brown/30 p-4 rounded-lg my-4">
                            <h4 className="font-bold text-lehigh-gold mb-2">AI Summary</h4>
                            <p className="text-sm text-white italic">{aiSummary}</p>
                        </div>
                    )}
                    
                    <div className="space-y-4 mt-4">
                        {course.reviews.length > 0 ? course.reviews.map(review => (
                            <div key={review.id} className="bg-lehigh-brown/30 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold">{review.author}</p>
                                    <p className="text-sm text-lehigh-light-gold">{review.date}</p>
                                </div>
                                <p className="font-bold text-lehigh-gold">Rating: {review.rating}/10</p>
                                <p className="mt-1 text-gray-300">"{review.comment}"</p>
                            </div>
                        )) : (
                            !showAddReview && <p className="text-center text-lehigh-light-gold">No reviews yet. Be the first to add one!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewsModal;

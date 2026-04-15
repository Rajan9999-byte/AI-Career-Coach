import FeedbackDisplay from '../FeedbackDisplay';

export default function FeedbackDisplayExample() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <FeedbackDisplay 
        overallScore={85}
        technicalAccuracy={90}
        communication={82}
        confidence={78}
      />
    </div>
  );
}

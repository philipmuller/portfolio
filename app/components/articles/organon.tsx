

export default function OrganonBody() {
    return (
        <>
        <p>
        Organon is an iOS app for reasoning clearly in logically valid patterns. It allows users to learn about the use of logic in argumentation and then apply that knowledge to craft arguments in an editor specifically designed for inferences. Using the editor guarantees argument validity.
Organon is designed to make learning logic more approachable. It condenses knowledge typically found in books and lectures into smaller chunks available in the Library section, with interactive widgets, exercises, and quizzes. These chunks can be followed stepwise as a course, but each chapter is immediately accessible and self-contained so it is great as a reference tool too.
Users can create, browse and edit their inferences in the arguments section. The editor supports writing arguments in propositional logic, with a symbolic representation generated as you type. It visualizes atomic propositions in plain text and their relationships in a symbolic tree. Editing the tree can be accomplished through inline text decorators inspired by markdown.
        </p>

        <video src="/organon/library1.mp4" autoPlay={true} loop={true} controls={false} className="h-96"/>
        
        </>
    );
}
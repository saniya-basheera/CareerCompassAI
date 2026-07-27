import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function MockInterview() {
  const location = useLocation();

  const jobRole = location.state?.jobRole || "Software Engineer";

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState("");

  const [result, setResult] = useState(null);

  const [scores, setScores] = useState([]);

  const [finished, setFinished] = useState(false);

  const startInterview = () => {
    setQuestions([
      `Tell me about yourself as a ${jobRole}.`,
      `Why do you want to become a ${jobRole}?`,
      `Explain one project you have worked on.`,
      `What are your strengths?`,
      `What challenges did you face during your project?`
    ]);

    setCurrentQuestion(0);
    setScores([]);
    setFinished(false);
    setResult(null);
    setAnswer("");
  };

  const submitAnswer = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/mock-interview",
        {
          jobRole,
          question: questions[currentQuestion],
          answer
        }
      );

      setResult(res.data);
      setScores((prev) => [...prev, res.data.score]);
    } catch (err) {
      console.log(err);
      alert("Failed to evaluate answer.");
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer("");
      setResult(null);
    } else {
      setFinished(true);
    }
  };

  const averageScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center p-10">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-4xl">

        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          🎤 AI Mock Interview
        </h1>

        {questions.length === 0 && (
          <button
            onClick={startInterview}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Start Interview
          </button>
        )}

        {questions.length > 0 && !finished && (
          <div className="mt-8">

            <h2 className="text-2xl font-semibold mb-6">
              Question {currentQuestion + 1} of {questions.length}
            </h2>

            <div className="bg-slate-100 p-5 rounded-xl text-lg">
              {questions[currentQuestion]}
            </div>

            <textarea
              rows={8}
              className="w-full border rounded-xl p-4 mt-6"
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            {!result ? (
              <button
                onClick={submitAnswer}
                className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
              >
                Submit Answer
              </button>
            ) : (
              <div className="mt-8 bg-slate-100 rounded-xl p-6">

                <h2 className="text-2xl font-bold text-green-700">
                  ⭐ Score: {result.score}/10
                </h2>

                <h3 className="mt-5 font-bold">
                  Feedback
                </h3>

                <p>{result.feedback}</p>

                <h3 className="mt-5 font-bold">
                  Ideal Answer
                </h3>

                <p>{result.idealAnswer}</p>

                <button
                  onClick={nextQuestion}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                >
                  {currentQuestion === questions.length - 1
                    ? "Finish Interview"
                    : "Next Question"}
                </button>

              </div>
            )}

          </div>
        )}

        {finished && (
          <div className="mt-10 bg-green-100 rounded-xl p-8 text-center">

            <h2 className="text-4xl font-bold text-green-700">
              🎉 Interview Completed!
            </h2>

            <p className="text-2xl mt-6">
              Final Score
            </p>

            <h1 className="text-6xl font-bold text-blue-700 mt-4">
              {averageScore}/10
            </h1>

            <button
              onClick={startInterview}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Retake Interview
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default MockInterview;
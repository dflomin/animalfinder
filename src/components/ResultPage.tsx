import React from "react";
import { GiEmptyHourglass, GiStarFormation } from "react-icons/gi";

type Animal = {
  name: string;
  image: string;
  description: string;
};

type ResultPageProps = {
  animal: Animal;
  onRetake: () => void;
};

const ResultPage = ({ animal, onRetake }: ResultPageProps) => {
  const shareOnWhatsApp = () => {
    const message = `I just took a quiz and found out I'm a ${animal.name}! 🐾 ${animal.description}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}%0A Take your quiz too on https://animalfinder.vercel.app!`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center bg-white rounded-lg p-8 max-w-lg">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full mx-auto mb-4 p-4"
        />
        <h1 className="text-3xl font-bold mb-4">You're a {animal.name}!</h1>
        <p className="text-lg text-gray-700 mb-6">{animal.description}</p>
        <p className="font-body mb-3"><GiEmptyHourglass className="inline" /> Your <strong>personality</strong> rating is <span className="bg-slate-200 text-xs inline-block p-1 rounded-lg">{Math.random() * 2}</span>. Nice!</p>
        <p className="font-body mb-3"><GiStarFormation className="inline" /> Your <strong>star channel</strong> rating is <span className="bg-slate-200 text-xs inline-block p-1 rounded-lg">{Math.floor(Math.random() * 10)}&deg; | {Math.floor(Math.random() * 10)}&deg;</span>. That's very unique!</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={shareOnWhatsApp}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Share on WhatsApp
          </button>
          <button
            onClick={onRetake}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

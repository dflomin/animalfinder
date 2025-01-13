import React from "react";

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
    const message = `I just took a quiz and found out I'm a ${animal.name}! 🐾 ${animal.description} %0A Take your quiz too on https://animalfinder.vercel.app!`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center bg-white rounded-lg p-8 max-w-lg">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full mx-auto mb-4 p-4"
        />
        <h1 className="text-3xl font-bold mb-4">You're a {animal.name}!</h1>
        <p className="text-lg text-gray-700 mb-6">{animal.description}</p>
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

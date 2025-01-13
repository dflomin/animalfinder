'use client';

import React, { useState } from "react";
import QuizForm from "@/components/QuizForm";
import ResultPage from "@/components/ResultPage"; // Import ResultPage
import animals from "@/app/data/animals";
import { Luckiest_Guy } from 'next/font/google';
import { GiSloth } from "react-icons/gi";

const logoFont = Luckiest_Guy({ subsets: ['latin'], weight: '400' });

const QuizPage = () => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const questions = [
    {
      name: "name",
      label: "What is your name? Nothing says more about you than your name!",
      type: "text",
      placeholder: "Enter your name",
      validation: { required: "Name is required" },
    },
    {
      "name": "foot_reaction",
      "label": "What is your reaction when someone accidentally steps on your foot?",
      "type": "radio",
      "options": [
        "I loudly say 'Ouch!' to make sure they know.",
        "I give them a silent glare.",
        "I laugh it off—it happens!",
        "I pretend it didn’t hurt and move on."
      ]
    },
    {
      "name": "color_taste",
      "label": "Which color feels like it would taste the best if colors were edible?",
      "type": "radio",
      "options": [
        "Red",
        "Yellow",
        "Green",
        "Purple"
      ]
    },
    {
      "name": "forks_count",
      "label": "How many forks do you think is the right number to own in your kitchen?",
      "type": "radio",
      "options": [
        "One for every person in the house—no more.",
        "At least 10, just in case.",
        "I’ve never counted, but probably too many.",
        "Why do you care about my forks?"
      ]
    },
    {
      "name": "squirrel_thought",
      "label": "When you see a squirrel in the park, what’s your immediate thought?",
      "type": "radio",
      "options": [
        "Aw, so cute!",
        "I wonder if it’s planning something.",
        "What’s it eating?",
        "Do squirrels ever get tired of being squirrels?"
      ]
    },
    {
      "name": "animal_communication",
      "label": "Imagine you’ve been offered the ability to communicate with only one of the following for a day. Which would you choose?",
      "type": "radio",
      "options": [
        "Birds",
        "Dogs",
        "Fish",
        "Insects"
      ]
    },
    {
      "name": "orange_peel",
      "label": "How do you peel an orange?",
      "type": "radio",
      "options": [
        "I carefully remove the peel in one perfect spiral.",
        "I just dig in with my fingers—it’s faster.",
        "I use a knife to make it easier.",
        "I don’t peel oranges; I avoid the hassle altogether."
      ]
    }
  ];

  const handleFormSubmit = (data: any) => {
    // Randomly pick an animal
    if (data.name.toLowerCase() === "ely")
      setSelectedAnimal(animals[0]);
    else {
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
      setSelectedAnimal(randomAnimal);
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedAnimal(null); // Reset the selected animal
  };

  return (
    <main className="" style={{ backgroundImage: 'url(/images/jungle.webp)', backgroundPosition: 'center center', backgroundSize: "cover" }}>
      <nav>
        <div className="w-full bg-blue-700 p-4 text-white border-b-4 border-b-blue-900">
          <div className={`${logoFont.className} text-2xl font-bold font-italic flex`}><GiSloth className="mr-2" /> AnimalFinder</div>
        </div>
      </nav>
      <div className="flex justify-center items-center min-h-screen">
        <div className="min-w-[300px] max-w-lg p-8 font-body">
          <div className="bg-opacity-70 p-5 bg-white">
            { !selectedAnimal 
              ? <>
                  <h1 className="text-2xl font-headline font-bold text-center mb-3">What is YOUR animal?</h1>
                  <p className="text-sm mb-5">Take this short quiz to find out what animal represents your personality the best!</p>
                  <QuizForm questions={questions} onSubmit={handleFormSubmit} />
                </>
              : <ResultPage animal={selectedAnimal} onRetake={handleRetakeQuiz} />
            }
          </div>
        </div>
      </div>
      <footer className="bg-slate-600 p-5 text-white font-bold font-body border-t-4 border-t-slate-800">
        Copybara AnimalFinder 2025
      </footer>
    </main>
  );
};

export default QuizPage;

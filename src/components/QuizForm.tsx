'use client';

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

type Question = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
  validation?: object;
};

type QuizFormProps = {
  questions: Question[];
  onSubmit: (data: any) => void;
};

const QuizForm = ({ questions, onSubmit }: QuizFormProps) => {
  const { handleSubmit, control, getValues } = useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = questions.length;
  const isLastStep = currentStep === totalSteps - 1;

  const goToNextStep = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleFormSubmit = () => {
    const data = getValues();
    onSubmit(data);
  };

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="relative w-full max-w-lg mx-auto flex flex-col"
    >
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Progress Label */}
      <div className="text-center text-sm mb-4">
        Question {currentStep + 1} of {totalSteps}
      </div>

      {/* Animated Question */}
      <div className="relative flex-1 min-h-[205px] overflow-x-hidden">
        <AnimatePresence initial={false} custom={currentStep}>
          {questions.map(
            (question, index) =>
              index === currentStep && (
                <motion.div
                  key={question.name}
                  custom={currentStep}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={slideVariants}
                  className="absolute w-full"
                >
                  <div className="space-y-4">
                    <label className="block text-sm font-medium mb-1">
                      {question.label}
                    </label>
                    {question.type === "text" && (
                      <Controller
                        name={question.name}
                        control={control}
                        defaultValue=""
                        rules={question.validation || {}}
                        render={({ field }) => (
                          <input
                            {...field}
                            placeholder={question.placeholder}
                            className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        )}
                      />
                    )}

                    {question.type === "radio" && question.options && (
                      <Controller
                        name={question.name}
                        control={control}
                        defaultValue=""
                        rules={question.validation || {}}
                        render={({ field }) => (
                          <div className="grid grid-cols-2 gap-2">
                            {question.options.map((option, idx) => (
                              <label key={idx} className="flex items-start">
                                <input
                                  type="radio"
                                  {...field}
                                  value={option}
                                  className="mr-2 mt-2 focus:ring-blue-500"
                                />
                                {option}
                              </label>
                            ))}
                          </div>
                        )}
                      />
                    )}

                    {question.type === "checkbox" && question.options && (
                      <Controller
                        name={question.name}
                        control={control}
                        defaultValue={[]}
                        rules={question.validation || {}}
                        render={({ field }) => (
                          <div className="grid grid-cols-2 gap-2">
                            {question.options.map((option, idx) => (
                              <label key={idx} className="flex items-center">
                                <input
                                  type="checkbox"
                                  {...field}
                                  value={option}
                                  className="mr-2 focus:ring-blue-500"
                                />
                                {option}
                              </label>
                            ))}
                          </div>
                        )}
                      />
                    )}
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={goToPreviousStep}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {!isLastStep && (
          <button
            type="button"
            onClick={goToNextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        )}
        {isLastStep && (
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default QuizForm;
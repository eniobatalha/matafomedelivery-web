import { FC } from 'react';
import './Steps.css';

interface StepsProps {
  currentStep: number;
}

const Steps: FC<StepsProps> = ({ currentStep }) => {
  return (
    <div className="steps flex justify-center gap-4 mb-8">
      <div className={`step ${currentStep === 0 ? 'active' : ''}`}>
        <p className={`step-text ${currentStep === 0 ? 'font-bold' : ''}`}>1. Digite o e-mail</p>
      </div>
      <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
        <p className={`step-text ${currentStep === 1 ? 'font-bold' : ''}`}>2. Digite o código</p>
      </div>
      <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
        <p className={`step-text ${currentStep === 2 ? 'font-bold' : ''}`}>3. Redefina a senha</p>
      </div>
    </div>
  );
};

export default Steps;

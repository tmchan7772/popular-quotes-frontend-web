import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';

export type LoadingStep = { title: string, isCompleted: boolean };

type LoadingProgressModalProps = {
  steps: LoadingStep[];
  cancel: () => void;
};

export default function LoadingProgressModal({ steps, cancel }: LoadingProgressModalProps) {
  const [currentStep, setCurrentStep] = useState('');

  const handleCancel = () => {
    cancel();
  };

  useEffect(() => {
    setCurrentStep(steps.find(step => !step.isCompleted)?.title || '');
  }, [steps]);

  return (
    <Modal
      wrapClassName='modal'
      title={currentStep}
      open={true}
      keyboard={false}
      maskClosable={false}
      closable={false}
      footer={
        <div className='left-aligned'>
          <Button key="submit" type="primary" onClick={() => handleCancel()}>
            Cancel
          </Button>
        </div>
      }
    >
      {steps.map((step, index) => {
        return <p key={index}>Step {index}: {step.title}..{step.isCompleted && 'Completed'}</p>;
      })}
    </Modal>
  );
}

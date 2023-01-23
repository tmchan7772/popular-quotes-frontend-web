import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';

type Step = { title: string, isCompleted: boolean };

export type TitledPromise<T> = { title: string, promise: Promise<T> };

type LoadingProgressModalProps = {
  requests: TitledPromise<unknown>[];
  cancel: () => void;
  onDone: () => void;
}

export default function LoadingProgressModal({ requests, cancel, onDone }: LoadingProgressModalProps) {
  const [steps, setSteps] = useState([] as Step[]);
  const [currentStep, setCurrentStep] = useState('');
  const handleCancel = () => {
    cancel();
  };

  const buildSteps = async () => {
    setSteps([]);

    for (let i = 0; i < requests.length; i++) {
      const title = requests[i].title;
      setCurrentStep(title);
      setSteps(currentSteps => {
        return [
          ...currentSteps,
          { title: title, isCompleted: false },
        ];
      });

      await requests[i].promise;

      setSteps(currentSteps => {
        return [
          ...currentSteps.slice(0, currentSteps.length - 1),
          { ...currentSteps[currentSteps.length - 1], isCompleted: true }
        ];
      });
    }

    onDone();
  };

  useEffect(() => {
    buildSteps();
  }, [requests]);

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
            <Button key="submit" type="primary" onClick={handleCancel}>
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

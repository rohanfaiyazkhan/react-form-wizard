import React, { useState, Children } from 'react';

function MultiStepForm(props) {
	const [ currentStep, setCurrentStep ] = useState(0);
	const { onSubmit } = props;
	const totalSteps = Children.count(props.children);
	const isNextDisallowed = currentStep >= totalSteps;
	const isPrevDisallowed = currentStep <= 0;

	const isSubmitDisabled = props.isSubmitDisabled ? props.isSubmitDisabled : currentStep !== totalSteps - 1;

	const goToPrevious = () => {
		if (!isNextDisallowed) setCurrentStep((currentStep) => currentStep - 1);
	};

	const goToNext = () => {
		if (!isPrevDisallowed) setCurrentStep((currentStep) => currentStep + 1);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'ArrowLeft') {
			goToPrevious();
		} else if (e.key === 'ArrowRight') {
			goToNext();
		}
	};

	return (
		<form onKeyPress={handleKeyPress} onSubmit={onSubmit}>
			<div className="circles">{currentStep + 1}</div>
			{Children.map(props.children, (child, index) => {
				if (index === currentStep) {
					return child;
				}
			})}
			<div className="button-group">
				<button onClick={goToPrevious} disabled={isPrevDisallowed}>
					Previous
				</button>
				<button onClick={goToNext} disabled={isNextDisallowed}>
					Next
				</button>
				<button type="submit" disabled={isSubmitDisabled}>
					Submit
				</button>
			</div>
		</form>
	);
}

export default MultiStepForm;

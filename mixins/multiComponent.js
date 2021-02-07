export default {
    data() {
        return {
            activeStep: 1,
            steps: [],
        };
    },
    computed: {
        stepsLength() {
            return this.steps.length;
        },
        isFirstStep() {
            return this.activeStep == 1;
        },
        isLastStep() {
            return this.activeStep == this.stepsLength;
        },
        activeComponent() {
            return this.steps[this.activeStep - 1];
        },
    },
    methods: {
        prevStep() {
            this.activeStep -= 1;
        },
        nextStep() {
            this.activeStep += 1;
        },
        goTo(step) {
            this.activeStep = step;
        },
        activeComponentClass(step) {
            return this.activeStep == step ? "is-active" : "";
        },
    },
};

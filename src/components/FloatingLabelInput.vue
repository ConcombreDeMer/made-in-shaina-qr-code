<template>
    <div class="floating-label-input">
        <input :id="id" v-model="internalValue" @focus="isFocused = true" @blur="isFocused = false" :type="type"
            :required="required" :class="{ filled: hasContent, focused: isFocused }" />
        <label :for="id" :class="{ 'label-floating': hasContent || isFocused }">
            {{ label }}
        </label>
    </div>
</template>

<script>
export default {
    name: "FloatingLabelInput",
    props: {
        modelValue: {
            type: [String, Number],
            default: "",
        },
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "text",
        },
        required: {
            type: Boolean,
            default: false,
        },
        id: {
            type: String,
            default() {
                return `input-${Math.random().toString(36).substr(2, 9)}`;
            },
        },
    },
    data() {
        return {
            isFocused: false,
            internalValue: this.modelValue, // Utilisation d'une valeur interne
        };
    },
    computed: {
        hasContent() {
            return this.internalValue !== "" && this.internalValue !== null;
        },
    },
    watch: {
        modelValue(newValue) {
            // Synchronisation des données si la prop est modifiée dans le parent
            this.internalValue = newValue;
        },
    },
    methods: {
        updateValue(event) {
            this.internalValue = event.target.value;
            this.$emit("update:modelValue", this.internalValue); // Émission d'un événement vers le parent
        },
    },
    mounted() {
        this.$watch(
            "internalValue",
            (value) => {
                if (value !== this.modelValue) {
                    this.$emit("update:modelValue", value);
                }
            },
            { immediate: true }
        );
    },
};
</script>

<style scoped>
.floating-label-input {
    position: relative;
    margin: 1vh 0;
    padding: 1vh 1vw;
    background-color: #EFEFEF;
    width: 45%;
    border-radius: 10px;
}

.floating-label-input input {
    width: 100%;
    padding: 12px 12px 12px 12px;
    font-size: 2vh;
    border: none;
    border-radius: 4px;
    outline: none;
    background-color: transparent;
}



.floating-label-input label {
    position: absolute;
    top: 50%;
    left: 1vw;
    transform: translateY(-50%);
    font-size: 2vh;
    pointer-events: none;
    transition: all 0.3s ease;
    font-weight: lighter;
}

.floating-label-input input.filled+label,
.floating-label-input input.focused+label,
.floating-label-input label.label-floating {
    top: 15px;
    left: 10px;
    padding: 0 4px;
    font-size: 1.2vh;
}
</style>
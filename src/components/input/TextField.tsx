type InputWithLabel = {
    label: string;
    value: string;
    onChange: (newValue: string) => void;
    inputId: string;
    autoFocus?: boolean;
};

export default function TextField({ label, value, onChange, inputId, autoFocus = false }: InputWithLabel) {
    return (
        <>
            <label htmlFor={inputId}>{label}</label>

            <input
                type='text'
                value={value}
                id={inputId}
                onChange={(e) => onChange(e.target.value)}
                autoFocus={autoFocus}
            />
        </>
    );
}

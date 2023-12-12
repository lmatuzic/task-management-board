type SelectProps<T extends string | number> = {
    label: string;
    value: T;
    options: { value: T; label: string }[];
    onChange: (newValue: T) => void;
    selectId: string;
};

export default function SelectField<T extends string | number>({
    label,
    value,
    options,
    onChange,
    selectId,
}: SelectProps<string | number>) {
    return (
        <>
            <label htmlFor={selectId}>{label}</label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
                id={selectId}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    );
}

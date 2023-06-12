import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

export default function Select({ options, control, isInvalid }) {
  return (
    <Controller
      name="subject"
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <ReactSelect
          ref={ref}
          options={options}
          placeholder="Assunto"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: '#111111',
              border: isInvalid
                ? '1px solid #F63535'
                : state.isFocused
                ? '1px solid #6847FF'
                : '1px solid #333333',
              minHeight: '42px',
              ':hover': {
                borderColor: '#6847FF',
              },
              color: '#ffffff',
              fontSize: '12px',
              padding: '0 6px',
              zIndex: 2,
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: '#282828',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: '400',
              fontFamily: 'Poppins',
              marginTop: '-2px',
              zIndex: 1,
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: '#999999',
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              color: '#ffffff',
              fontSize: '12px',
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              padding: '14px',
            }),
            dropdownIndicator: (baseStyles, state) => ({
              ...baseStyles,
              color: state.selectProps.menuIsOpen ? '#ffffff' : '#999999',
              ':hover': {
                color: '#ffffff',
              },
              transition: 'all .2s ease',
              transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
            }),
            input: (baseStyles) => ({
              ...baseStyles,
              color: isInvalid ? '#F63535' : '#ffffff',
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: '4px',
            colors: {
              ...theme.colors,
              primary25: '#333333',
              primary: '#333333',
            },
          })}
          value={options.find((option) => option.value === value)}
          onChange={(val) => onChange(val.value)}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      )}
    />
  )
}

import React, { useCallback } from 'react'

import type { Props } from './types'

import { radio } from '../../../../../fields/validations'
import useField from '../../useField'
import withCondition from '../../withCondition'
import RadioGroupInput from './Input'

const RadioGroup: React.FC<Props> = (props) => {
  const {
    name,
    admin: {
      className,
      condition,
      description,
      layout = 'horizontal',
      readOnly,
      style,
      width,
      components: { Error, Label } = {},
    } = {},
    label,
    options,
    path: pathFromProps,
    required,
    validate = radio,
  } = props

  const path = pathFromProps || name

  const memoizedValidate = useCallback(
    (value, validationOptions) => {
      return validate(value, { ...validationOptions, options, required })
    },
    [validate, options, required],
  )

  const { errorMessage, setValue, showError, value } = useField<string>({
    condition,
    path,
    validate: memoizedValidate,
  })

  return (
    <RadioGroupInput
      className={className}
      description={description}
      errorMessage={errorMessage}
      label={label}
      layout={layout}
      name={name}
      onChange={readOnly ? undefined : setValue}
      options={options}
      path={path}
      required={required}
      showError={showError}
      style={style}
      value={value}
      width={width}
      Error={Error}
      Label={Label}
    />
  )
}

export default withCondition(RadioGroup)

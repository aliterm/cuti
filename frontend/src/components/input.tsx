import { ComponentProps, FC, forwardRef, useState } from 'react'
import { HiEye } from 'react-icons/hi'
import { HiEyeSlash } from 'react-icons/hi2'
import { twMerge } from 'tailwind-merge'

export interface InputProps extends Omit<ComponentProps<'input'>, 'ref' | 'color'> {
  icon?: FC<ComponentProps<'svg'>>
  rightIcon?: FC<ComponentProps<'svg'>>
  floatingLabel?: boolean
  wrapperClass?: string
  showingPasword?: boolean
  label?: string
  helperText?: string | FC<ComponentProps<'p'>>
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = 'text', wrapperClass, floatingLabel, icon: Icon, rightIcon: RightIcon, showingPasword, label, ...props },
    ref,
  ) => {
    let defaultClass = `bg-gray-50 autofill:bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
      Icon ? 'ps-10' : ''
    } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`

    if (floatingLabel) {
      defaultClass =
        'block autofill:bg-transparent py-2.5 ps-5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
    }

    const [showPassword, setShowPassword] = useState(false)

    let _type = type
    if (type === 'password' && showingPasword && showPassword) {
      _type = 'text'
    }

    if (type === 'text' && showingPasword && !showPassword) {
      _type = 'password'
    }

    const id = props.id ? props.id : props.name
    const xprops = props

    delete xprops.helperText

    return (
      <>
        {!floatingLabel && label && (
          <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </label>
        )}
        <div className={twMerge('relative z-0 w-full mb-5 group', wrapperClass)}>
          {Icon && (
            <div
              // absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none
              className={`absolute inset-y-0 start-0 flex items-center ${
                floatingLabel ? 'ps-0' : 'ps-3.5'
              } pointer-events-none`}
            >
              <Icon className="opacity-50" />
            </div>
          )}

          <input
            className={twMerge(defaultClass, props.className)}
            type={_type}
            {...xprops}
            ref={ref}
            id={id}
            placeholder={floatingLabel ? '' : props.placeholder}
          />
          {floatingLabel && (
            <label
              htmlFor={id}
              className="peer-placeholder-shown:ps-5 peer-focus:ps-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {props.placeholder}
            </label>
          )}

          {RightIcon && <RightIcon className="opacity-50 absolute inset-y-0 end-0 flex items-center pe-3.5" />}

          {type === 'password' && showingPasword && (
            <button
              type="button"
              role="button"
              onClick={() => setShowPassword(!showPassword)}
              className={'absolute inset-y-0 end-0 flex items-center pe-3.5'}
              title="Show or Hide Password"
            >
              {showPassword ? <HiEyeSlash className="opacity-50" /> : <HiEye className="opacity-50" />}
            </button>
          )}

          {typeof props.helperText === 'string' && <p className="text-sm">{props.helperText}</p>}
          {typeof props.helperText === 'function' && <props.helperText />}
        </div>
      </>
    )
  },
)

Input.displayName = 'Input'
export default Input

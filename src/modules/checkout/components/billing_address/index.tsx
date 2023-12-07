import { CheckoutFormValues } from "@lib/context/checkout-context"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import { emailRegex } from "@lib/util/regex"

const BillingAddress = () => {
  return (
    <ConnectForm<CheckoutFormValues>>
      {({ register, formState: { errors, touchedFields } }) => (
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First name"
            {...register("billing_address.first_name", {
              required: "First name is required",
            })}
            autoComplete="given-name"
            errors={errors}
            touched={touchedFields}
            required
          />
          <Input
            label="Last name"
            {...register("billing_address.last_name", {
              required: "Last name is required",
            })}
            autoComplete="family-name"
            errors={errors}
            touched={touchedFields}
            required
          />
          <Input
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: emailRegex,
            })}
            autoComplete="email"
            errors={errors}
            touched={touchedFields}
            required
          />
        </div>
      )}
    </ConnectForm>
  )
}

export default BillingAddress

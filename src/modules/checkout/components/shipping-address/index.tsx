import { CheckoutFormValues } from "@lib/context/checkout-context"
import { emailRegex } from "@lib/util/regex"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import { useMeCustomer } from "medusa-react"
import AddressSelect from "../address-select"
import CountrySelect from "../country-select"
import Checkbox from "@modules/common/components/checkbox"
import { Container } from "@medusajs/ui"

const ShippingAddress = ({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: () => void
}) => {
  const { customer } = useMeCustomer()

  return (
    <div>
      {customer && (customer.shipping_addresses?.length || 0) > 0 && (
        <Container className="mb-6 flex flex-col gap-y-4 p-5">
          <p className="text-small-regular">
            {`Hi ${customer.first_name}, do you want to use one of your saved addresses?`}
          </p>
          <AddressSelect addresses={customer.shipping_addresses} />
        </Container>
      )}
      <ConnectForm<CheckoutFormValues>>
        {({ register, formState: { errors, touchedFields } }) => (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First name"
                {...register("shipping_address.first_name", {
                  required: "First name is required",
                })}
                autoComplete="given-name"
                errors={errors}
                touched={touchedFields}
                required
              />
              <Input
                label="Last name"
                {...register("shipping_address.last_name", {
                  required: "Last name is required",
                })}
                autoComplete="family-name"
                errors={errors}
                touched={touchedFields}
                required
              />
            </div>
            <div className="my-8">
              <Checkbox
                label="Same as billing address"
                checked={checked}
                onChange={onChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
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
          </>
        )}
      </ConnectForm>
    </div>
  )
}

export default ShippingAddress

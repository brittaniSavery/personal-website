import clsx from "clsx";
import React from "react";
import Emoji from "./Emoji";
import SelectField from "./fields/SelectField";
import TextField from "./fields/TextField";

type OrderBooksProps = {
  open: boolean;
  onClose(): void;
  topics: Topic[];
};

type OrderBooksErrors = {
  email: string;
  firstName: string;
  lastName: string;
  addr1: string;
  city: string;
  state: string;
  zip: string;
};

export default function OrderBooks({
  open,
  onClose,
  topics,
}: OrderBooksProps): JSX.Element {
  const states = [
    "AL",
    "AK",
    "AS",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FM",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MH",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PW",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VI",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const noErrors: OrderBooksErrors = {
    email: "",
    firstName: "",
    lastName: "",
    addr1: "",
    city: "",
    state: "",
    zip: "",
  };

  const [formErrors, setFormErrors] = React.useState<OrderBooksErrors>(
    noErrors
  );

  function orderSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target;
    const validity = form.checkValidity();
    const formData = new FormData(form);

    if (!validity) {
      const currentErrors = noErrors;
      for (const key of formData.keys()) {
        const current = document.getElementById(key) as HTMLInputElement;
        const error = current.validity.valueMissing
          ? "This field is required"
          : current.validity.typeMismatch
          ? "This email address is not valid."
          : "";
        currentErrors[key] = error;
      }
      setFormErrors(currentErrors);

      return;
    }

    const formJson: Record<string, unknown> = {};
    for (const [name, value] of formData) {
      formJson[name] = value.toString();
    }
    setFormErrors(noErrors);
    console.log(formJson);
  }

  return (
    <div className={clsx("modal is-clipped", { "is-active": open })}>
      <div className="modal-background" onClick={onClose} />
      <form noValidate onSubmit={orderSubmit}>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title has-text-primary">
              Order Autographed Copies
            </p>
            <button className="delete" aria-label="close" onClick={onClose} />
          </header>
          <section className="modal-card-body">
            <p className="mb-3">
              Fill out the form below to order autographed copies of{" "}
              <span className="is-italic">Element Unknown</span>. Currently,
              this is only available for those in the United States.
            </p>
            <div className="columns is-multiline">
              <div className="column is-full">
                <TextField
                  id="email"
                  label="Email"
                  error={formErrors.email}
                  required
                  autoFocus
                />
              </div>
              <div className="column is-half">
                <TextField
                  id="firstName"
                  label="First Name"
                  error={formErrors.firstName}
                  required
                />
              </div>
              <div className="column is-half">
                <TextField
                  id="lastName"
                  label="Last Name"
                  error={formErrors.lastName}
                  required
                />
              </div>
              <div className="column is-half">
                <TextField
                  id="addr1"
                  label="Street Address"
                  error={formErrors.addr1}
                  required
                />
              </div>
              <div className="column is-half">
                <TextField
                  id="addr2"
                  label="Apartment, Suite, etc. (optional)"
                />
              </div>
              <div className="column is-7">
                <TextField
                  id="city"
                  label="City"
                  error={formErrors.city}
                  required
                />
              </div>
              <div className="column is-2">
                <SelectField
                  id="state"
                  label="State"
                  options={states}
                  error={formErrors.state}
                  getOptionLabel={(state) => String(state)}
                  getOptionValue={(state) => String(state)}
                  showEmptyOption
                  required
                />
              </div>
              <div className="column">
                <TextField
                  id="zip"
                  label="Zip Code"
                  error={formErrors.zip}
                  maxLength={5}
                  style={{ width: "5em" }} //Bulma Hack: doesn't recognize size attribute
                  required
                />
              </div>
              <div className="column is-2">
                <TextField
                  type="number"
                  id="count"
                  label="Quantity"
                  min={1}
                  defaultValue={1}
                  style={{ maxWidth: "5em" }}
                />
              </div>
              <div className="column">
                <SelectField
                  options={[
                    { label: "Standard Shipping", value: "standard" },
                    { label: "Priority Shipping", value: "priority" },
                  ]}
                  id="shipping"
                  label="Shipping Type"
                  getOptionLabel={(option) =>
                    typeof option === "object" ? String(option.label) : option
                  }
                  getOptionValue={(option) =>
                    typeof option === "object" ? String(option.value) : option
                  }
                />
              </div>
              <div className="column is-full">
                <div className="field">
                  <label htmlFor="notes" className="label">
                    Notes (optional)
                  </label>
                  <div className="control">
                    <textarea
                      id="notes"
                      name="notes"
                      className="textarea"
                      placeholder="Personalization, shipping details, etc."
                    />
                  </div>
                </div>
              </div>
              <div className="column is-full">
                <div className="field">
                  <span className="label has-text-primary">
                    Newsletter Sign-Up (optional)
                  </span>
                  <p className="mb-2">
                    If you would like to receive updates on my various projects
                    or ramblings, select the topics that interest you the most.{" "}
                    <Emoji name="smile" />
                  </p>
                  {topics.map((topic) => (
                    <div key={topic.name} className="control">
                      <label htmlFor="writing" className="checkbox">
                        <input
                          name={topic.name}
                          id={topic.name}
                          type="checkbox"
                          value={topic.id}
                        />
                        &nbsp; {topic.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button type="submit" className="button is-primary">
              Order
            </button>
            <button onClick={onClose} className="button">
              Cancel
            </button>
          </footer>
        </div>
      </form>
    </div>
  );
}

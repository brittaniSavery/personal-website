---
title: Mailchimp in "The Attack of the Bots"
publishDate: 2022-09-30
tags:
  - coder
newsletter: coder
description: The spam bots finally found my little piece of the internet and flooded my newsletter with thousands of sign-ups from a "Hot Alisa". This post describes the steps I took to make sure that the spamming can never happen again.
meta:
  description: Spam bots found my newsletter and flooded it with thousands of sign-ups. This post describes my fight against the machines.
thumbnail: mailchimp-attack-of-bots.jpg
---

Well, it finally happened. The spam bots found my little piece of the internet and flooded my poor Mailchimp newsletter with hundreds of thousands of sign-ups, all from a "Hot Alisa" apparently. :eye_roll:

I discovered the spam while on vacation in Atlanta with my sister. I usually check my newsletter every once in a while to see if someone new signed up and if I can recognize the name. The newsletter is mostly family, friends, and work colleagues but I'll also have an interested stranger sign up every once in a while. That always gives me the warm fuzzies. :hug:

So, while on my laptop and checking out Mailchimp, I noticed the thousands of sign-ups and saw that sign-ups had been paused since I'm on the free plan for Mailchimp that only allows 500 contacts and 2,500 emails per month. I was definitely well over that. The worst part was that I had to manually archive all of those spam sign-ups. It wasn't hard but rather tedious. :/ I told my sister that as soon as I got home, I would have to add a CAPTCHA of some kind to prevent this from happening again.

![An animated gif showing the checkbox for Google reCAPTCHA](/images/posts/google-recaptcha-example.gif) {.is-pulled-right}

According to [Wikipedia](https://en.wikipedia.org/wiki/CAPTCHA), a CAPTCHA (which stands for "Completely Automated Public Turing test to tell Computers and Humans Apart") is a type of challenge–response test used in computing to determine whether the user is human. If you've been around the internet for any moment of time, you would have definitely seen one. The most common varieties include picking images that contain a certain object like bicycles, reading moving and/or distorted letters, and even just checking a box that says "I'm not a robot". There are levels of difficulty, which can unfortunately keep out real humans. The system isn't perfect, but it can prevent most spam attacks at a slight inconvenience to human users.

There are two main options for CAPTCHA: Google reCAPTCHA and hCaptcha. I picked hCaptcha since it's more focused on privacy. The documentation also seemed a bit easier to understand and implement for me. There is a React component for hCaptcha and it was super easy to integrate into the current newsletter form. A fragment of the `newsletter.tsx` below:

```js
import HCaptcha from "@hcaptcha/react-hcaptcha";
.
.
.
export default function Newsletter({ topics }: NewsletterProps): JSX.Element {
  // This keeps track of any errors with the CAPTCHA
  const [captchaError, setCaptchaError] = useState("");

  // This holds the token generated once the user completes the CAPTCHA
  const [captchaToken, setCaptchaToken] = useState<string>(null);
.
.
.
  function joinSubmit() {
    // making sure the CAPTCHA is not empty and successfully completed
    if (isEmpty(formJson["h-captcha-response"])) {
      setCaptchaError("The captcha check is required.");
    } else {
      // verify the captcha token, i.e. make sure this user is a human and not a bot
      const verified = await fetch("/api/captcha", {
        method: "POST",
        body: new URLSearchParams({ token: captchaToken }),
      });

      if (!verified.ok) {
        setCaptchaError(
          "The captcha check was not successful. Please try again."
        );
      }
    }

    // form has some kind of error, so we'll reset the CAPTCHA and let the user fix the form error
    if (nameError || emailError || captchaError) {
      captchaRef.current.resetCaptcha();
      return;
    }
  }

  return (
    <form>
    .
    .
    .
        <div className="field">
          <span className="label has-text-primary">Proof of Humanity</span>
          <HCaptcha
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
            onVerify={(token) => {
              setCaptchaToken(token);
            }}
            ref={captchaRef}
          />
          <p className={clsx("help is-danger")} aria-live="polite">
            {captchaError}
          </p>
        </div>
    </form>
  )
}
```

With hCaptcha in place, I have not experienced any spamming. :raised_hands: If you want to try out the new and exciting CAPTCHA, sign up for the [newsletter](/newsletter) and you'll get the bonus of updates from me. :smile: Do you have any funny stories about your dealings with spam bots or other tech security concerns? Let me know!

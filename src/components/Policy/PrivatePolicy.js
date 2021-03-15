import React from 'react'
import Button from 'react-bootstrap/Button'

// import styling
import './PrivatePolicy.scss'

const PrivatePolicy = () => {
  return (
    <div>
      <div className="private-policy-container">
        <article>
          <header>
            <h1 className="private-policy-title">Private Policy</h1>
            <p className="private-policy-title-text">
              We are commited to protecting your personal privacy as you visit
              our website.
            </p>
          </header>
          <main>
            <div className="email-policy">
              <h5 className="email-policy-title">Email:</h5>
              <p className="email-policy-text">
                We will never email you! Your email will only be used to log in
                securely to medithanks.co. Your account allows you to easily
                create, edit, and delete posts you write. Viewing requires no
                signup or account.
              </p>
            </div>
            <div className="hippa-policy">
              <h5 className="hippa-policy-title">HIPPA:</h5>
              <p className="hippa-policy-text--first">
                We are HIPPA conscious. Your screen name is your decision. For
                further flexibility and control, on each post, you may chooe to
                display your screen name or post anonymously.
              </p>
              <p className="hippa-policy-text--second">
                Please be cautious of what you share and keep in mind that these
                messages are public. Don&apos;t share specific or sensitive
                information. If you have any concerns about if what you are
                sharing is too sensitive, please refer to the{' '}
                <a
                  href="https://www.hhs.gov/hipaa/for-individuals/guidance-materials-for-consumers/index.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  HIPPA guidelines.
                </a>
              </p>
            </div>
            <div className="misuse-policy">
              <h5 className="misuse-policy-title">Misuse:</h5>
              <p className="misuse-policy-text">
                Misuse of Medithanks will not be tolerated. We have the right to
                take down any offensive content or post we deem as inappropriate
                use of the Medi+thanks application.
              </p>
            </div>
            <div className="use-of-information-policy">
              <h5 className="use-of-information-title">Use of Information:</h5>
              <p className="use-of-information-text">
                We don&apos;t use any of your information for any purpose. We
                will never share your information with anyone.
              </p>
            </div>
            <div className="contact-information">
              <p className="contact-information-message">
                Media inquiries, questions, concerns? Send a short message to{' '}
                <a href="mailto: medithanks21@gmail.com">
                  medithanks21@gmail.com
                </a>
              </p>
            </div>
            <Button className="button-sign-up" href="#sign-up" type="submit">
              Back to Sign Up
            </Button>
          </main>
        </article>
      </div>
    </div>
  )
}

export default PrivatePolicy

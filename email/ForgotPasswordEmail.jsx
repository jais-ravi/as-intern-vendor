import * as React from "react";
import {
  Html,
  Button,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

export default function ForgotPasswordEmail({ firstName, otp }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Password Reset Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your password reset code: {otp}</Preview>
      <Section style={styles.section}>
        <Row>
          <Heading as="h2" style={styles.heading}>
            Hello {firstName},
          </Heading>
        </Row>
        <Row>
          <Text style={styles.message}>
            We received a request to reset your password. Please use the following code to reset your password:
          </Text>
        </Row>
        <Row style={styles.otpContainer}>
          <Text style={styles.otp}>{otp}</Text>
        </Row>
        <Row>
          <Text style={styles.note}>
            This code is valid for the next 10 minutes. If you didn’t request a password reset, you can safely ignore this email.
          </Text>
        </Row>
        {/* Uncomment this section if you want to add a reset link button */}
        {/* <Row>
          <Button
            href={`http://localhost:3000/reset-password/${otp}`}
            style={styles.button}
          >
            Reset Password
          </Button>
        </Row> */}
      </Section>
    </Html>
  );
}

const styles = {
  section: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: 'auto',
    fontFamily: 'Roboto, Verdana, sans-serif',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  message: {
    fontSize: '16px',
    color: '#555',
    margin: '10px 0',
    textAlign: 'center',
  },
  otpContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  otp: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1890ff',
    backgroundColor: '#e6f7ff',
    padding: '10px 20px',
    borderRadius: '4px',
  },
  note: {
    fontSize: '14px',
    color: '#777',
    textAlign: 'center',
    marginTop: '20px',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#61dafb',
    color: '#fff',
    padding: '10px 20px',
    textDecoration: 'none',
    borderRadius: '4px',
    textAlign: 'center',
  },
};

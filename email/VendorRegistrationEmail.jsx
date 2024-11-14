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

export default function VendorRegistrationEmail({ firstName }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Vendor Registration Successful</title>
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
      <Preview>Congratulations {firstName}, you're registered as a vendor!</Preview>
      <Section style={styles.section}>
        <Row>
          <Heading as="h2" style={styles.heading}>
            Congratulations, {firstName}!
          </Heading>
        </Row>
        <Row>
          <Text style={styles.message}>
            You have successfully registered as a vendor. We're excited to have you on board!
          </Text>
        </Row>
        <Row>
          <Text style={styles.message}>
            Please note that your account is pending approval from our admin team. Once approved, you’ll be able to access all vendor features and start listing your products.
          </Text>
        </Row>
        <Row>
          <Text style={styles.footer}>
            If you have any questions in the meantime, feel free to reach out to our support team. Thank you for your patience and welcome aboard!
          </Text>
        </Row>
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
  footer: {
    fontSize: '14px',
    color: '#777',
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default (async function sendSmsAsync(phoneNumber, countryCode) {
  let response = await fetch('https://twilio-api-server-jlcjjijtbz.now.sh', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      phoneNumber: `${countryCode} ${phoneNumber}`,
      message: 'Your Lyft code is 2052',
    }),
  });

  let result = await response.json();
  return result;
});

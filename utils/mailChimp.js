const mailchimp = require("@mailchimp/mailchimp_marketing");

module.exports.createMailChimp = async (email, firstname) => {
  try {
    mailchimp.setConfig({
      apiKey: process.env.API_KEY,
      server: "us14",
    });

    const response = await mailchimp.lists.addListMember(process.env.LIST_ID, {
      email_address: email,
      merge_fields: {
        FNAME: firstname,
      },
      status: "subscribed",
      tags: ["BootCamp"],
    });
    return response.id;
  } catch (e) {
    console.log(e.message);
  }
};

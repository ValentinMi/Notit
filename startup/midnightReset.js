const CronJob = require("cron").CronJob;

// Reset note boolean at midnight
module.exports = function() {
  new CronJob("00 00 00 * * *", async function() {
    const users = await User.find();

    users.forEach(async user => {
      user.thisDayNoted = false;
      await user.save();
    });
    console.log("Note Boolean Reseted");
  });
};

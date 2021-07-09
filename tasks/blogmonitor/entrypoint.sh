#!/bin/sh

# Start the run once job.
echo "Docker container has been started"

# Setup a cron schedule
echo "* * * * * /usr/src/BlogMonitor/run.sh
# This extra line makes it a valid cron" > scheduler.txt

#   >> /var/log/cron.log 2>&1

crontab scheduler.txt
crontab -l
crond -f
echo "yay"
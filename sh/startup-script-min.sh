set -v

# Talk to the metadata server to get the project id
PROJECTID=$(curl -s "http://metadata.google.internal/computeMetadata/v1/project/project-id" -H "Metadata-Flavor: Google")

# Install logging monitor. The monitor will automatically pick up logs sent to
# syslog.
curl -s "https://storage.googleapis.com/signals-agents/logging/google-fluentd-install.sh" | bash
service google-fluentd restart &

# Install dependencies from apt
#apt-get update
#apt-get install -yq ca-certificates git nodejs build-essential supervisor


# Install nodejs
#mkdir /opt/nodejs
#curl https://nodejs.org/dist/v4.2.2/node-v4.2.2-linux-x64.tar.gz | tar xvzf - -C /opt/nodejs --strip-components=1
#ln -s /opt/nodejs/bin/node /usr/bin/node
#ln -s /opt/nodejs/bin/npm /usr/bin/npm

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
#sudo apt-get install -y nodejs

# nodejs-legacy
#apt-get install -y build-essential
#apt-get install nodejs-legacy
#sudo ln -s `which nodejs` /usr/bin/node


# Get the application source code from the Google Cloud Repository.
# git requires $HOME and it's not set during the startup script.
export HOME=/root
git config --global credential.helper gcloud.sh
git clone https://source.developers.google.com/p/$PROJECTID /opt/votebd

# Install necessary node module
#sudo npm install -g strongloop
#sudo npm install -g bower
#sudo npm install -g grunt-cli
#sudo npm install -g forever

# Create a nodeapp user. The application will run as this user.
useradd -m -d /home/nodeapp nodeapp
chown -R nodeapp:nodeapp /opt/votebd

# Create Raw file directory
#mkdir /opt/votebd/storage
cp /opt/votebd/Gruntfile_bkup.js /opt/votebd/Gruntfile.js

# Install app dependencies
cd /opt/votebd
npm install
bower install --allow-root
grunt build

# Configure supervisor to run the node app.
#rm /etc/supervisor/conf.d/node-app.conf
#cat >/etc/supervisor/conf.d/node-app.conf << EOF
#[program:nodeapp]
#directory=/opt/votebd
#command=sudo npm start
#autostart=true
#autorestart=true
#user=nodeapp
#environment=HOME="/home/nodeapp",USER="nodeapp",NODE_ENV="development"
#stdout_logfile=syslog
#stderr_logfile=syslog
#EOF

#supervisorctl reread
#supervisorctl update

# Application should now be running under supervisor

#sudo forever start /opt/votebd/server/server.js

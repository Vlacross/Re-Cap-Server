


function email(email) {

  if(typeof email != "string") {
    return false
  }
  if(!email.includes('@')) {
    console.log('faltz')
  }
};

const VALID_STYLES = ['Swing', 'Salsa', 'Flaminca']


module.exports = { email, VALID_STYLES }




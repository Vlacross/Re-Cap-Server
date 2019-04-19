

function CLASS_SIZE_LIMIT(arr) {

  return arr.length <= 12
}


function email(email) {

  if(typeof email != "string") {
    return false
  }
  if(!email.includes('@')) {
    console.log('faltz')
  }
  // let str = email.split(/[@\.]/g)
  // return str.forEach(segment => {
  //   if(segment.length )
  // })
};

const VALID_STYLES = ['Swing', 'Salsa', 'Flaminca']


module.exports = { email, VALID_STYLES, CLASS_SIZE_LIMIT }




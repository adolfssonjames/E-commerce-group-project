import React from 'react'
import '../CSS/MyAccount.css';

function MyAccount() {
  

  
  
  
    return (
    <div>
        <table className='test'>
            <tr>
                <td>email:</td>
                <button>update email</button>
                <td>password: </td>
                <button>update password</button>
            </tr>
        </table>

        <table>
            <tr>
                <th>Orders</th>
            </tr>
        </table>
    </div>
  )
}

export default MyAccount
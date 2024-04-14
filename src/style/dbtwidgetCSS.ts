import { style } from 'typestyle';

export const dbtbutton = style({
    padding: '10px 25px',
    margin: '10px',
    cursor: 'pointer',
    fontSize: '20px',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#04AA6D',
    borderRadius: '10px',
    boxShadow: '0 9px #999',
    $nest: {
        '&:hover': {
          backgroundColor: '#3e8e41'
        },
        '&:active':{
            boxShadow: '0 5px #666',
            transform: 'translateY(4px)'
        }
      }
  });

export const flexbuttonpan = style({
  display: 'flex'
})

window.addEventListener('load', () => {
  
  // Show Tickets tab and set background color of the heading\n  const ticketLabel = document.getElementById('ticket_label');
  ticketLabel.style.backgroundColor = 'white';
  const diningLabel = document.getElementById('dining_label');
  const hotelLabel = document.getElementById('hotel_label');

  // Remove hover and show/hide effect of CW2 for headings and menu items, and replace it using onclick event
  const ticketTab = document.getElementById('ticket_tab');
  const diningTab = document.getElementById('dining_tab');
  const hotelTab = document.getElementById('hotel_tab');

  const showTicketTab = () => {
    ticketTab.style.display = 'block';
    diningTab.style.display = 'none';
    hotelTab.style.display = 'none';
    ticketLabel.style.backgroundColor = 'white';
    diningLabel.style.backgroundColor = '';
    hotelLabel.style.backgroundColor = '';
  };
  const showDiningTab = () => {
    ticketTab.style.display = 'none';
    diningTab.style.display = 'block';
    hotelTab.style.display = 'none';
    ticketLabel.style.backgroundColor = '';
    diningLabel.style.backgroundColor = 'white';
    hotelLabel.style.backgroundColor = '';
  };
  const showHotelTab = () => {
    ticketTab.style.display = 'none';
    diningTab.style.display = 'none';
    hotelTab.style.display = 'block';
    ticketLabel.style.backgroundColor = '';
    diningLabel.style.backgroundColor = '';
    hotelLabel.style.backgroundColor = 'white';
  };

  ticketLabel.onclick = showTicketTab;
  diningLabel.onclick = showDiningTab;
  hotelLabel.onclick = showHotelTab;

  // Add event listeners for all "Add" buttons in the menu items
  const addButtonList = document.querySelectorAll('button[id^="t"], button[id^="d"], button[id^="h"]');

  addButtonList.forEach(button => {
    button.addEventListener('click', () => {      
      const idArr = button.id.split('-');
      const description = document.getElementById(`${idArr[0]}-img`).getAttribute('alt');
      const qty = document.getElementById(`${button.id}-qty`).value;
      const trList = document.querySelectorAll('#order_table tbody tr');
      const tfoot = document.querySelector('#order_table tfoot tr td:last-child');    // Check if description already in table and add or increase quantity
      let isAdded = false;
      for (let i = 0; i < trList.length; i++) {
        const tdDesc = trList[i].querySelector('td');
        const tdQty = tdDesc.nextElementSibling;      
        if (tdDesc.textContent === description) {
            tdQty.textContent = parseInt(tdQty.textContent) + parseInt(qty);
          isAdded = true;
          break;
        }
      }

      // If description not in table, add new row
      if (!isAdded) {
        const tbody = document.querySelector('#order_table tbody');
        const row = tbody.insertRow();
        const descCell = row.insertCell();
        const qtyCell = row.insertCell();

        descCell.textContent = description;
        qtyCell.textContent = qty;
      }
      
      // Calculate total quantity and update footer
      let totalQty = 0;
      for (let i = 0; i < trList.length; i++) {
            const tdQty = trList[i].querySelector('td:last-child');
            totalQty += parseInt(tdQty.textContent)
        }
      tfoot.textContent = totalQty;
    });
  });

  // Set up onclick event handler for undo link to delete last ordered item and update total quantity
  const undoLink = document.getElementById('undo');
  undoLink.onclick = () => {
    const tbody = document.querySelector('#order_table tbody');
    const trList = document.querySelectorAll('#order_table tbody tr');
    const tfoot = document.querySelector('#order_table tfoot tr td:last-child');

    // Check if there are items in the table to undo
    if (trList.length > 0) {
      const lastRow = trList[trList.length - 1];
      const lastQty = lastRow.querySelector('td:last-child').textContent;
      tbody.deleteRow(-1);

      let totalQty = parseInt(tfoot.textContent) - parseInt(lastQty);
      tfoot.textContent = totalQty >= 0 ? totalQty : 0;
    }

    return false; // Cancel onclick event
  }

});
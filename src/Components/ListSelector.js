const ListSelector = ({list, setList, listData}) => {
  function focus() {
    const el = document.getElementById("list-input");
    el.focus();
    const modal = document.getElementById("list-modal");
    if(modal.style.display === "block"){
      modal.style.display = "none"
    }
    else{
      modal.style.display = "block"
    }
  }

  return(
    <div class="list-selector">
      <div className="list-selector__container" onClick={() => focus()}>
        <input id="list-input" type="text" defaultValue="None" />
        <i class="fas fa-caret-down"></i>
      </div>

      <div id="list-modal" className="list-selector__modal">
        <div className="list-selector__modal--item">
          <p className="copy__para--medium">None</p>
        </div>
          {
            listData.map((d, i) => 
                         <div key={i} className={list === d.id ? "list-selector__modal--item active" : "list-selector__modal--item"} onClick={() => setList(d.id)}>
                <p className="copy__para--medium">{d.name}</p>
              </div>
             )
          }
        <div className="list-selector__modal--item btn-create">
          <p className="btn-tertiary">Create a list</p>
        </div>
      </div>
    </div>
  )
}

export default ListSelector

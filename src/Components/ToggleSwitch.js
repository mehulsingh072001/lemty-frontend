const ToggleSwitch = ({enabled, toggleSwitch, mailIndex, stepIndex}) => {
  return(
    <div className={`toggle-container ${enabled ? "enabled" : "disabled"}`}  onClick={() => toggleSwitch(mailIndex, stepIndex)}>
      <div className={`dialog-button`}>
      </div>
    </div>
  )
}

export default ToggleSwitch

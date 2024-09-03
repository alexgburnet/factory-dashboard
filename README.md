# Factory-dashboard

## v1.0

### Machine Efficiency Bar Chart:

<p align="center">
  <img src="https://github.com/alexgburnet/factory-dashboard/blob/main/README%20images/barchart.png" alt="bar chart" width="800"/>
</p>

- Shows the machine efficiencies for a given shift.
- If that is the current shift, then the total hours is scaled appropriately to be current time - shift start
- Efficiency is calculated by total shift time - sum of fault down time / total shft time

### Action List:

<p align="center">
  <img src="https://github.com/alexgburnet/factory-dashboard/blob/main/README%20images/actionlist.png" alt="action list" width="800"/>
</p>

- Actions to be completed after entered in from the fault reports.
- Should be reviewed daily to ensure it is being kept on top of

### Machine cards:

<p align="center">
  <img src="https://github.com/alexgburnet/factory-dashboard/blob/main/README%20images/machinecards.png" alt="machine cards" width="800"/>
</p>

- Visually shows thebreakdown of what is causing the most faults for each machine
- Shows the assigned operator

### Fault log

<p align="center">
  <img src="https://github.com/alexgburnet/factory-dashboard/blob/main/README%20images/faultlog.png" alt="fault log" width="800"/>
</p>

- Accessed by selecting the machine card for the desired machine frm the home page
- simply displays the faults for that machine for that shift in chronological order

### Fault Report

<p align="center">
  <img src="https://github.com/alexgburnet/factory-dashboard/blob/main/README%20images/faultreport.png" alt="fault report" width="800"/>
</p>

- Accessed in the same place as fault log
- Collects faults together and displays the total down time by fault, and also what percentage of the total downtime was caused by this fault
- Can be sorted by highest percentage when header is clicked

### Adding Actions

<p align="center">
  <img src="https://github.com/alexgburnet/factory-dashboard/blob/main/README%20images/setaction.png" alt="set actions" width="800"/>
</p>

- Select on a particular fault within the fault report to open action form.
- Input whether the machine is threaded linearly and correctly to spec sheet
- Input an observations
> e.g. noticed many faults in xxx needle location
- Input an action
> e.g. replace the tongue in xxx needle location

### Assigning operators to a machine for a shift

- Get here by clicking the hamburger menu => Control Panel

<p align="center">
  <img src="https://github.com/alexgburnet/factory-dashboard/blob/main/README%20images/controlpanel.png" alt="Control Panel" width="800"/>
</p>

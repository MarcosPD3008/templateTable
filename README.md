# Table Component

## Overview

This project contains a reusable Angular table component that can display data dynamically with customizable headers and actions. The component supports both a default rendering template and a custom template for more advanced use cases. Additionally, it provides a loading state to indicate data fetching or processing.

## Features

- **Customizable Headers**: Define the columns of the table with specified labels.
- **Dynamic Data Display**: Render rows of data based on provided items.
- **Action Buttons**: Perform actions on each row with specified functions.
- **Loading State**: Display a loading indicator when data is being fetched or processed.
- **Custom Templates**: Customize the row rendering with your own templates.

## Installation

1. **Clone the Repository**: Clone the repository to your local machine.
2. **Install Dependencies**: Navigate to the project directory and run `npm install` to install the necessary dependencies.
3. **Build the Project**: Build the project using `ng build`.

## Usage

### Inputs

- **headers**: An array of objects defining the table headers. Each object should have `key` and `label` properties.
- **items**: An array of objects containing the data to be displayed in the table.
- **actions**: An array of action objects defining the actions that can be performed on each row. Each object should have `label`, `icon`, and `function` properties.
- **template**: A reference to an `ng-template` for customizing the row rendering.
- **loading**: A boolean indicating whether the table should display a loading state.

### Default Template

To use the table component with its default template, you need to provide `headers`, `items`, and `actions` inputs. The table will automatically render the data according to these inputs.

#### Example

```html
<h1>No Template (Default)</h1>
<app-table [headers]="headers"
           [items]="items"
           [actions]="actions">
</app-table>
```

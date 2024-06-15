$(document).ready(function() {
    // Initialize tabs
    $("#tabs").tabs();

    // Initialize sliders with default value 0
    $("#minColumnSlider, #maxColumnSlider, #minRowSlider, #maxRowSlider").slider({
        min: -50,
        max: 50,
        value: 0,  // Set default value to 0
        slide: function(event, ui) {
            $("#" + $(this).attr("data-input")).val(ui.value).trigger("input");
        }
    });

    // Bind text inputs to sliders
    $("#minColumnValue, #maxColumnValue, #minRowValue, #maxRowValue").on("input", function() {
        const sliderId = "#" + $(this).attr("data-slider");
        $(sliderId).slider("value", $(this).val());
    });

    // Form validation
    $("#multiplicationForm").validate({
        rules: {
            minColumnValue: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            maxColumnValue: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            minRowValue: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            maxRowValue: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages: {
            minColumnValue: {
                required: "Please enter a minimum column value",
                number: "Please enter a valid number",
                range: "Please enter a number between -50 and 50"
            },
            maxColumnValue: {
                required: "Please enter a maximum column value",
                number: "Please enter a valid number",
                range: "Please enter a number between -50 and 50"
            },
            minRowValue: {
                required: "Please enter a minimum row value",
                number: "Please enter a valid number",
                range: "Please enter a number between -50 and 50"
            },
            maxRowValue: {
                required: "Please enter a maximum row value",
                number: "Please enter a valid number",
                range: "Please enter a number between -50 and 50"
            }
        },
        submitHandler: function(form) {
            // Clear error message
            $("#errorMessage").text("");
            // Get user input values
            const minColumnValue = parseInt($("#minColumnValue").val());
            const maxColumnValue = parseInt($("#maxColumnValue").val());
            const minRowValue = parseInt($("#minRowValue").val());
            const maxRowValue = parseInt($("#maxRowValue").val());

            // Add console log
            console.log("minColumnValue:", minColumnValue);
            console.log("maxColumnValue:", maxColumnValue);
            console.log("minRowValue:", minRowValue);
            console.log("maxRowValue:", maxRowValue);

            // Generate table and add to new tab
            const tabId = "tab" + $("#tabs ul li").length;
            $("#tabs ul").append(`<li><a href="#${tabId}">Table (${minColumnValue}, ${maxColumnValue}, ${minRowValue}, ${maxRowValue})</a> <span class="ui-icon ui-icon-close" role="presentation"></span></li>`);
            $("#tabs").append(`<div id="${tabId}"></div>`);
            generateTable(minColumnValue, maxColumnValue, minRowValue, maxRowValue, `#${tabId}`);
            $("#tabs").tabs("refresh");
            $("#tabs").tabs("option", "active", -1);  // Set the newly added tab as active
            return false;
        }
    });

    // Remove tab
    $("#tabs").on("click", ".ui-icon-close", function() {
        const panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        $("#tabs").tabs("refresh");
    });

    // Generate table function
    function generateTable(minColumn, maxColumn, minRow, maxRow, containerId) {
        const tableContainer = $(containerId);
        tableContainer.html(''); // Clear previous table

        // Create table elements
        const table = $('<table></table>');
        const thead = $('<thead></thead>');
        const tbody = $('<tbody></tbody>');

        // Create header row
        const headerRow = $('<tr></tr>');
        const emptyHeader = $('<th></th>');
        headerRow.append(emptyHeader);
        for (let i = minColumn; i <= maxColumn; i++) {
            const th = $('<th></th>').text(i);
            headerRow.append(th);
        }
        thead.append(headerRow);
        table.append(thead);

        // Create table body
        for (let i = minRow; i <= maxRow; i++) {
            const row = $('<tr></tr>');
            const th = $('<th></th>').text(i);
            row.append(th);
            for (let j = minColumn; j <= maxColumn; j++) {
                const td = $('<td></td>').text(i * j);
                row.append(td);
            }
            tbody.append(row);
        }
        table.append(tbody);
        tableContainer.append(table); // Append the generated table to the container
    }
});

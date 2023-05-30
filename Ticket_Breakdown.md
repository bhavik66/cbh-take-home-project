# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Update Agent table to include custom IDs

**Description:**
Currently, the reports generated for Facilities use the internal database ID of each Agent. To provide the ability for Facilities to save their own custom IDs for each Agent, we need to update the Agent table in the database to include a field for storing custom IDs.

**Acceptance Criteria:**
1. The Agent table in the database should have a new column named "custom_id" to store custom IDs provided by Facilities.
2. The custom_id column should be nullable to allow Facilities to save or update custom IDs as needed.
3. Existing Agents should have the custom_id column set to NULL initially.
4. The custom_id field should be included when retrieving Agent information for generating reports.

Effort Estimate: **6 hours**

**Implementation Details:**
1. Modify the database schema to add the custom_id column to the Agent table.
2. Write a database migration script to update the existing Agent records and set the custom_id field to NULL.
3. Update the data access layer (e.g., SQL queries or ORM) to include the custom_id field when retrieving Agent information.
4. Update the generateReport function to use the custom_id field instead of the internal database ID when generating the PDF reports.


### Ticket 2: Facility interface for managing Agent custom IDs

**Description:**
To enable Facilities to save and update custom IDs for Agents, we need to provide a user interface in our platform where Facilities can manage the custom IDs associated with each Agent they work with.

**Acceptance Criteria:**
1. Create a new page or section in the Facility interface specifically for managing Agent custom IDs.
2. The page should display a list of Agents associated with the Facility, including their existing custom IDs (if any).
3. Facilities should be able to add, edit, or remove custom IDs for Agents.
4. Custom IDs should be validated for uniqueness within the Facility.
5. Provide appropriate error handling and validation messages for the input fields.
6. Changes to custom IDs should be saved and reflected in the database.

Effort Estimate: **16 hours**

**Implementation Details:**
1. Design and create a new page or section in the Facility interface to manage Agent custom IDs.
2. Implement a server-side API endpoint to handle custom ID management requests from the Facility interface.
3. Implement the necessary server-side logic to validate custom IDs, handle database updates, and enforce uniqueness within the Facility.
4. Integrate the API endpoint with the Facility interface to allow Facilities to add, edit, or remove custom IDs for Agents.


### Ticket 3: Update Shift report generation to use custom Agent IDs

**Description:**
To incorporate the custom IDs saved by Facilities, we need to update the report generation process to use the custom IDs instead of the internal database IDs for Agent identification.

**Acceptance Criteria:**
1. Modify the generateReport function to retrieve the custom_id of each Agent from the database instead of using the internal database ID.
2. Update the report generation logic to use the custom_id when generating the Agent section of the report.
3. Ensure that the custom_id is displayed correctly in the PDF report and aligned with the corresponding Agent's shift information.
4. Perform testing to verify that the reports generated now include the custom IDs instead of the internal database IDs.

Effort Estimate: **12 hours**

**Implementation Details:**
1. Update the generateReport function to fetch the custom_id of each Agent associated with the Shifts.
2. Modify the report template or generation code to include the custom_id in the Agent section of the report.
3. Test the report generation process with different scenarios, including Shifts with Agents having custom IDs and Shifts without custom IDs.
4. Ensure that the generated report accurately reflects the custom IDs provided by Facilities.


### Ticket 4: Update report API and PDF template

**Description:**
To accommodate the changes in the report generation process and include custom Agent IDs, we need to update the API responsible for generating reports and modify the PDF template to display the custom IDs correctly.

**Acceptance Criteria:**
1. Update the report generation API endpoint to retrieve the custom IDs of Agents and include them in the report data.
2. Modify the PDF template layout to allocate space for displaying the custom IDs alongside the Agent information.
3. Ensure that the custom IDs are properly aligned and formatted in the generated PDF report.
4. Test the report generation API with various scenarios, including Shifts with custom IDs and Shifts without custom IDs, to verify the accurate inclusion of custom IDs in the reports.

Effort Estimate: **10 hours**

**Implementation Details:**
1. Update the report generation API endpoint to fetch the custom IDs of Agents associated with the Shifts.
2. Modify the report data structure to include the custom ID field for each Agent.
3. Adjust the PDF template layout to allocate space for displaying the custom IDs.
4. Update the report generation logic to populate the custom ID field in the PDF template.
5. Test the report generation API with different scenarios, ensuring that the custom IDs are correctly displayed in the generated PDF reports.


### Ticket 5: Documentation and User Guide Update

**Description:**
To inform Facilities about the new feature allowing custom IDs for Agents and guide them on how to use it, we need to update the documentation and user guide.

**Acceptance Criteria:**
1. Review and update relevant sections of the documentation and user guide to reflect the addition of custom IDs for Agents.
2. Clearly explain the purpose and benefits of using custom IDs.
3. Provide step-by-step instructions for Facilities on how to set and manage custom IDs for Agents.
4. Ensure that the updated documentation is accessible to Facilities through our platform.

Effort Estimate: **4 hours**

**Implementation Details:**
1. Review the existing documentation and user guide to identify sections requiring updates related to custom IDs.
2. Add new sections or modify existing sections to provide information about the custom ID feature.
3. Write clear and concise instructions on how Facilities can set and manage custom IDs for Agents.
4. Update the platform's documentation repository or knowledge base to include the updated documentation.
5. Verify that the updated documentation is accessible to Facilities through the platform's help or support section.

**NOTE:** In this case, We consider agent will not change facility, If We have to support feature fot change facility then We need to do some modification like add one extra table for mapping custom_id, agent_id and facility_id.
# Summary of changes
- Description of the proposed changes

## Frontend
List all significant changes to Gatsby code


### Are there Gatsby Code changes?
- [ ] No
- [ ] If yes, then:
   - [ ] Code is complete and commented.
   - [ ] Code is secure to the best of our knowledge
   - Are there new content types to display as pages?
      - [ ] No
      - [ ] If yes, then:
         - [ ] Ensure a Gatsby page alias is set up in gatsby-config and gatsby-node
         - [ ] Ensure the site still runs if all values are null (e.g. add a schema, check for null/undefined values)
   - [ ] Pull request (PR) is mergeable with *master* branch
   - [ ] PR has a meaningful title
   - [ ] PR has a summary of changes
   - [ ] PR is peer reviewed and meets team standards.
   - [ ] PR builds without error

## Backend


### Are there Site Configuration changes?
- [ ] No
- [ ] If yes, then:
   - [ ] Use a multidev
   - [ ] Add any modules to the upstream with composer (not through the Drupal UI)
   - [ ] If changes expose additional APIs (e.g. JSON), ensure site has been configured to account for this.
   - Are there new content types?
      - [ ] No
      - [ ] If yes, then:
         - [ ] Permissions are set
         - [ ] Content is configured to go through Content Moderation workflow
         - [ ] Content can be tagged by appropriate vocabularies
         - [ ] URL alias field is not visible to content creators
         - [ ] Fields are displayed in an order that is consistent with other content types
   - Are there new taxonomy types?
      - [ ] No
      - [ ] If yes, then:
         - [ ] Permissions are set
         - [ ] URL alias field is not visible to content creators
         - [ ] Fields are displayed in an order that is consistent with other content types
   - [ ] Do not reference layout in site configuration (e.g. content types, fields, labels)
   - [ ] Provide user guidance where possible
   - [ ] Confirm multidev status report does introduce new errors
   - [ ] Ensure only necessary site configuration changes are exported
   - [ ] Export and commit site-configuration on multidev
   - [ ] Configuration is secure to the best of your knowledge
   - [ ] Multidev peer reviewed and meets team standards
   - [ ] Multidev merged with Dev environment

# Test Plan

Insert steps. Include URLs of Gatsby Cloud test site and Drupal multidev.
- add testing steps

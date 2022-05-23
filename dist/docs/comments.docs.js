/**
 * @swagger
 * components:
 *  schemas:
 *      comment:
 *          type: object
 *          properties:
 *              comment_postId:
 *                  type: number
 *                  description: postId of the comment
 *              comment_id:
 *                  type: string
 *                  description: objectId of the comment
 *              comment_name:
 *                  type: string
 *                  description: name of the comment
 *              comment_email:
 *                  type: string
 *                  description: email of the comment
 *              comment_body:
 *                  type: string
 *                  description: body of the comment
 *          required:
 *              - comment_postId
 *              - comment_name
 *              - comment_email
 *              - comment_body
 *          example:
 *              postId: 84
 *              id: 417
 *              name: quia reiciendis nobis minima quia et saepe
 *              email: May_Steuber@virgil.net
 *              body: et vitae consectetur ut voluptatem\net et eveniet sit\nincidunt tenetur voluptatem\nprovident occaecati exercitationem neque placeat
 *
 */
/**
 *@swagger
 * /comments:
 *  get:
 *      sumary: Get all comments
 *      tags: [Comments]
 *      responses:
 *          200:
 *              description: A list of comments
 *              content:
 *                  application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/comment'
 *
 */
/**
 *@swagger
 * /comments:
 *  post:
 *      sumary: Create a new comment
 *      tags: [Comments]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/comment'
 *
 */
/**
 * @swagger
 * /comments/id:
 *  put:
 *      sumary: Edit a comment whit the param for id
 *      tags: [Comments]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: Comment identifier
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/comment'
 *          responses:
 *              200:
 *                  Successfully updated comment with id ${id}
 *              304:
 *                  Comment with id: ${id} not updated
 *
 */
/**
 * @swagger
 * /comments/id:
 *  delete:
 *      sumary: Deleting a comment with the id
 *      tags: [Comments]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: Comment identifier
 *      responses:
 *          202:
 *              description: Comment delete
 *          400:
 *              description: Failed to remove comment whit ${id}
 *          404:
 *              description: Comment with id ${id} does not exist
 *
 */
//# sourceMappingURL=comments.docs.js.map
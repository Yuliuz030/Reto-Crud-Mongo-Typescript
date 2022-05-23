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
 *
 */
/**
 *@swagger
 * /comments:
 *  post:
 *      sumary: Create a new comment
 *      tags: [comments]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/comment'
 *
 */
//# sourceMappingURL=comments.doc.js.map
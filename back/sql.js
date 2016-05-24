var sql = require("sql");

var tournament = sql.define({
    name: "tournament",
    columns: ["id"]
})

var match = sql.define({
    name: "match",
    columns: ["id", "player1", "player2", "scoreP1", "scoreP2"]
})

var player = sql.define({
    name: "player",
    columns: ["id", "name", "tournaments", "score"]
})

console.log(player.toQuery().text);

var query = user.select(user.star()).from(user).toQuery();
console.log(query.text); //SELECT "user".* FROM "user"

query = user
    .select(user.id)
    .from(user)
    .where(user.name.equals("boom")
            .and(user.id.equals(1)))
        .or(user.name.equals("bang")
            .and(user.id.equals(2)))
    .toQuery();
    
//SELECT "user"."id" FROM "user" 
//WHERE ((("user"."name" = $1) 
//      AND ("user"."id" = $2)) 
//  OR (("user"."name" = $3) 
//      AND ("user"."id" = $4)))
console.log(query.text);
//["boom", 1, "bang", 2]
console.log(query.values);

query = user.select(user.star()).from(user).toNamedQuery("user.all");
console.log(query.name) //user.all

query = user.select(user.name, post.body)
    .from(user.join(post)
        .on(user.id.equals(post.userId)))
    .toQuery();

//SELECT user.name, post.body FROM user
//INNER JOIN post ON (user.id = post.userId)
console.log(query.text);

var friendship = sql.define({
    name: "friendship",
    columns: ["userId", "friendId"]
});

var friends = user.as("friends");
var userToFriends = user
    .leftJoin(friendship)
    .on(user.id.equals(friendship.userId))
    .leftJoin(friends)
    .on(friendship.friendId.equals(friends.id));
    
var friendsWHLIQ = user.from(userToFriends)
    .where(friends.lastLogin.isNotNull());
    
//SELECT * FROM "user" 
//LEFT JOIN "friendship" ON ("user"."id" = "friendship"."userId") 
//LEFT JOIN "user" AS "friends" ON ("friendship"."friendId" = "friends"."id") 
//WHERE "friends"."lastLogin" IS NOT NULL 

var friendsWUGMQ = user.from(userToFriends)
    .where(friends.email.like("%@gmail.com"));
    
//SELECT * FROM "user" 
//LEFT JOIN "friendship" ON ("user"."id" = "friendship"."userId") 
//LEFT JOIN "user" AS "friends" ON ("friendship"."friendId" = "friends"."id") 
//WHERE "friends"."email" LIKE %1 
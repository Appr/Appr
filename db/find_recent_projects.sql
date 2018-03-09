select * from project
where author_id = $1
order by last_opened desc limit 3;

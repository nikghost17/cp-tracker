-- Increment the current_count of a goal by 1
default
CREATE OR REPLACE FUNCTION increment_goal_count(goal_id integer)
RETURNS void AS $$
BEGIN
  UPDATE goals SET current_count = current_count + 1 WHERE id = goal_id;
END;
$$ LANGUAGE plpgsql; 
USE HealthForumDb;

INSERT INTO Categories (Name, Label, Description, CreatedAt)
VALUES
    ('Sức khoẻ tâm lý', 'mental-health', 'Stress, giấc ngủ, cảm xúc và sức khoẻ tinh thần.', NOW()),
    ('Dinh dưỡng', 'nutrition', 'Chế độ ăn lành mạnh, kế hoạch dinh dưỡng.', NOW()),
    ('Thể hình', 'fitness', 'Luyện tập, thể thao và sức bền.', NOW());

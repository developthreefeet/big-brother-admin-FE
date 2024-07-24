function CommentList() {
  const commentList = [
    {
      id: 1,
      user_name: '유저1',
      comment: '댓글컨텐츠',
    },
    {
      id: 2,
      user_name: '유저2',
      comment: '댓글컨텐츠 어쩌고저쩌고 힘들다',
    },
  ];

  return (
    <div className="flex flex-col space-y-5 pt-10">
      <p className="text-lg font-bold">댓글</p>
      {commentList.map((item, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-bold">{item.user_name}</p>
            <p className="text-sm ">{item.comment}</p>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default CommentList;

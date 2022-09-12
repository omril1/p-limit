import pLimit from 'p-limit';

const limit = pLimit(10);

async function tryLimit(num) {
  console.log(num, 'inside tryLimit');
  await Promise.all(
    Array.from({ length: 10 }, () =>
      limit(() => {
        console.log(
          num,
          'inside nested limit, activeCount:',
          limit.activeCount,
          'pendingCount:',
          limit.pendingCount
        );
        return new Promise((r) =>
          setTimeout(() => {
            console.log(
              num,
              'resolving promise, activeCount:',
              limit.activeCount,
              'pendingCount:',
              limit.pendingCount
            );
            r();
          }, 100)
        );
      })
    )
  );
}

tryLimit(1);
tryLimit(2);

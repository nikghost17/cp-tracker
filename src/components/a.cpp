#include <bits/stdc++.h>
using namespace std;

int get_max_value(int N, vector<int> v, int B)
{
    if (N == 0)
        return 0;

    vector<long long> dp(N + 4, 0);
    vector<long long> bp(N + 4, 0);

    for (int i = N - 1; i >= 0; --i)
    {
        bp[i] = v[i] + max({0LL, bp[i + 3] + B, dp[i + 4]});
        dp[i] = max(dp[i + 1], bp[i]);
    }

    return dp[0];
}

int main()
{
    int N;
    cin >> N;

    vector<int> v(N);
    for (int i = 0; i < N; i++)
    {
        cin >> v[i];
    }

    int B;
    cin >> B;

    cout << get_max_value(N, v, B) << endl;

    return 0;
}